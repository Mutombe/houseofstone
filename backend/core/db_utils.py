from django.db import connection
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

def close_old_connections():
    """Close old database connections"""
    from django.db import connections
    for conn in connections.all():
        conn.close_if_unusable_or_obsolete()

def get_db_connection_info():
    """Get current database connection statistics"""
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT 
                count(*) as total,
                count(*) FILTER (WHERE state = 'active') as active,
                count(*) FILTER (WHERE state = 'idle') as idle,
                count(*) FILTER (WHERE state = 'idle in transaction') as idle_in_transaction
            FROM pg_stat_activity
            WHERE datname = %s AND usename = %s
        """, [settings.DATABASES['default']['NAME'], 
              settings.DATABASES['default']['USER']])
        return cursor.fetchone()

def kill_idle_connections():
    """Kill idle connections older than 5 minutes"""
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT pg_terminate_backend(pid)
            FROM pg_stat_activity
            WHERE datname = %s 
            AND usename = %s
            AND state = 'idle'
            AND state_change < NOW() - INTERVAL '5 minutes'
        """, [settings.DATABASES['default']['NAME'],
              settings.DATABASES['default']['USER']])