from django.db import migrations


def remove_arthur_tumbwe(apps, schema_editor):
    Agent = apps.get_model('core', 'Agent')
    deleted_count, _ = Agent.objects.filter(
        first_name__iexact='Arthur',
        surname__iexact='Tumbwe'
    ).delete()
    if deleted_count:
        print(f'\n  Removed agent Arthur Tumbwe ({deleted_count} record(s))')


def noop(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0027_add_agent_profile_image'),
    ]

    operations = [
        migrations.RunPython(remove_arthur_tumbwe, noop),
    ]
