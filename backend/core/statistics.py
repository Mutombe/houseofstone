from django.db.models import Count
from .models import PropertyInteraction
from django_plotly_dash import DjangoDash
import plotly.express as px
import pandas as pd

def create_view_trend_chart():
    data = PropertyInteraction.objects.filter(interaction_type='view') \
        .extra({'date': "date(timestamp)"}) \
        .values('date') \
        .annotate(count=Count('id')) \
        .order_by('date')
    
    df = pd.DataFrame(list(data))
    
    app = DjangoDash('ViewTrends')
    app.layout = px.line(df, x='date', y='count', 
                        title='Property View Trends',
                        labels={'count': 'Views', 'date': 'Date'})
    
    return app