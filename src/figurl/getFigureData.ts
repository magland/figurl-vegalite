import { GetFigureDataRequest, isGetFigureDataResponse } from "./pluginInterface/FigurlRequestTypes"
import sendRequestToParent from "./pluginInterface/sendRequestToParent"

const getFigureData = async () => {
    const request: GetFigureDataRequest = {
        type: 'getFigureData'
    }
    const response = await sendRequestToParent(request)
    if (!isGetFigureDataResponse(response)) throw Error('Invalid response to getFigureData')
    return response.figureData
}

export default getFigureData