import React, { useEffect, useState } from 'react';
import './App.css';
import { getFigureData, useWindowDimensions } from './figurl';
import { isVegaLiteData, VegaLiteComponent, VegaLiteData } from './VegaLiteComponent/VegaLiteComponent';


// const getFigureDataOrTest = async (): Promise<any> => {
//   const urlSearchParams = new URLSearchParams(window.location.search)
//   const params = Object.fromEntries(urlSearchParams.entries())
//   if (params.test === '1') {
//     return {spec: {"config": {"view": {"continuousWidth": 400, "continuousHeight": 300}}, "data": {"name": "data-c2a3e89ba9d5d1687d5e8c28d630a033"}, "mark": "bar", "encoding": {"x": {"type": "nominal", "field": "a"}, "y": {"type": "quantitative", "field": "b"}}, "$schema": "https://vega.github.io/schema/vega-lite/v4.8.1.json", "datasets": {"data-c2a3e89ba9d5d1687d5e8c28d630a033": [{"a": "A", "b": 28}, {"a": "B", "b": 55}, {"a": "C", "b": 43}, {"a": "D", "b": 91}, {"a": "E", "b": 81}, {"a": "F", "b": 53}, {"a": "G", "b": 19}, {"a": "H", "b": 87}, {"a": "I", "b": 52}]}}}
//   }
//   return await getFigureData()
// }

function App() {
  const [data, setData] = useState<VegaLiteData>()
  const [errorMessage, setErrorMessage] = useState<string>()
  const {width, height} = useWindowDimensions()

  useEffect(() => {
    getFigureData().then((data: any) => {
      if (!isVegaLiteData(data)) {
        setErrorMessage(`Invalid figure data`)
        console.error('Invalid figure data', data)
        return
      }
      setData(data)
    }).catch(err => {
      setErrorMessage(`Error getting figure data`)
      console.error(`Error getting figure data`, err)
    })
  }, [])

  if (errorMessage) {
    return <div style={{color: 'red'}}>{errorMessage}</div>
  }

  if (!data) {
    return <div>Waiting for data</div>
  }

  return (
    <VegaLiteComponent
      data={data}
      width={width - 10}  // we don't want the scrollbar to appear even when the menu is opened
      height={height - 5} // we don't want the scrollbar to appear
    />
  )
}

export default App;
