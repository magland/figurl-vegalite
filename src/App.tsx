import { useWindowDimensions } from '@figurl/core-utils';
import { getFigureData, startListeningToParent } from '@figurl/interface';
import { useEffect, useState } from 'react';
import './App.css';
import { isVegaLiteData, VegaLiteComponent } from './VegaLiteComponent/VegaLiteComponent';


// const getFigureDataOrTest = async (): Promise<any> => {
//   const urlSearchParams = new URLSearchParams(window.location.search)
//   const params = Object.fromEntries(urlSearchParams.entries())
//   if (params.test === '1') {
//     return {spec: {"config": {"view": {"continuousWidth": 400, "continuousHeight": 300}}, "data": {"name": "data-c2a3e89ba9d5d1687d5e8c28d630a033"}, "mark": "bar", "encoding": {"x": {"type": "nominal", "field": "a"}, "y": {"type": "quantitative", "field": "b"}}, "$schema": "https://vega.github.io/schema/vega-lite/v4.8.1.json", "datasets": {"data-c2a3e89ba9d5d1687d5e8c28d630a033": [{"a": "A", "b": 28}, {"a": "B", "b": 55}, {"a": "C", "b": 43}, {"a": "D", "b": 91}, {"a": "E", "b": 81}, {"a": "F", "b": 53}, {"a": "G", "b": 19}, {"a": "H", "b": 87}, {"a": "I", "b": 52}]}}}
//   }
//   return await getFigureData()
// }

const urlSearchParams = new URLSearchParams(window.location.search)
const queryParams = Object.fromEntries(urlSearchParams.entries())

function App() {
  const [data, setData] = useState<any>()
  const [errorMessage, setErrorMessage] = useState<string>()
  const {width, height} = useWindowDimensions()

  useEffect(() => {
    if (queryParams.test === '1') {
      // To test the Test1View without using the figurl parent
      // for example, with no internet connection,
      // use http://localhost:3000?test=1
      setData({spec: {"config": {"view": {"continuousWidth": 400, "continuousHeight": 300}}, "data": {"name": "data-c2a3e89ba9d5d1687d5e8c28d630a033"}, "mark": "bar", "encoding": {"x": {"type": "nominal", "field": "a"}, "y": {"type": "quantitative", "field": "b"}}, "$schema": "https://vega.github.io/schema/vega-lite/v4.8.1.json", "datasets": {"data-c2a3e89ba9d5d1687d5e8c28d630a033": [{"a": "A", "b": 28}, {"a": "B", "b": 55}, {"a": "C", "b": 43}, {"a": "D", "b": 91}, {"a": "E", "b": 81}, {"a": "F", "b": 53}, {"a": "G", "b": 19}, {"a": "H", "b": 87}, {"a": "I", "b": 52}]}}})
    }
    else {
      getFigureData().then((data: any) => {
        if (!data) {
          setErrorMessage(`No data returned by getFigureData()`)
          return
        }
        setData(data)
      }).catch((err: any) => {
        setErrorMessage(`Error getting figure data`)
        console.error(`Error getting figure data`, err)
      })
    }
  }, [])

  if ((!queryParams.figureId) && (queryParams.test !== "1")) {
    return (
      <div style={{padding: 20}}>
        <h2>This page is not being embedded as a figurl figure.</h2>
      </div>
    )
  }

  if (errorMessage) {
    return <div style={{color: 'red'}}>{errorMessage}</div>
  }

  if (!data) {
    return <div>Waiting for data</div>
  }

  if (!isVegaLiteData(data)) {
    console.warn(data)
    throw Error('Invalid data')
  }

  return (
    <VegaLiteComponent
      data={data}
      width={width - 10}  // we don't want the scrollbar to appear even when the menu is opened
      height={height - 5} // we don't want the scrollbar to appear
    />
  )
}

startListeningToParent()

export default App;
