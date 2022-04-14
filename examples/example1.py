import altair as alt
import numpy as np
import pandas as pd
import figurl2 as fig

# This script is adapted from an example on the Altair website
n = 1000
x = np.arange(n) / n
source = pd.DataFrame({
  'x': x,
  'f(x)': np.sin(2 * np.pi * 12 * x ** 2) * x
})

# Create the Altair chart
chart = alt.Chart(source).mark_line().encode(
    x='x',
    y='f(x)'
)

# optionally display the chart if you are in a notebook
# display(chart)

# Generate and print the figURL
url = fig.Altair(chart).url(label='Example Altair plot')
print(url)