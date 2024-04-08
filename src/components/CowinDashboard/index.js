import React, {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    vaccinationObj: {},
  }

  componentDidMount() {
    this.onGetVaccinationData()
  }

  onGetVaccinationData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'
    try {
      const response = await fetch(covidVaccinationDataApiUrl)

      if (response.ok === true) {
        const data = await response.json()

        // Function to convert keys from snake_case to camelCase
        const convertKeysToCamelCase = obj => {
          if (typeof obj !== 'object' || obj === null) {
            return obj
          }
          if (Array.isArray(obj)) {
            return obj.map(item => convertKeysToCamelCase(item))
          }
          return Object.keys(obj).reduce((acc, key) => {
            const camelCaseKey = key.replace(/_(\w)/g, (_, letter) =>
              letter.toUpperCase(),
            )
            acc[camelCaseKey] = convertKeysToCamelCase(obj[key])
            return acc
          }, {})
        }

        // Convert keys to camelCase
        const updatedData = convertKeysToCamelCase(data)

        // Update state with converted data
        this.setState({
          vaccinationObj: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      console.error('Error fetching vaccination data:', error)
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div>
      <div className="products-loader-container">
        <Loader
          type="ThreeDots"
          color="#0b69ff"
          height="50"
          width="50"
          testid="loader"
        />
      </div>
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderSuccessView = () => {
    const {vaccinationObj} = this.state
    return (
      <div className="bg-container">
        <VaccinationCoverage vaccinationObj={vaccinationObj} />
        <VaccinationByGender vaccinationObj={vaccinationObj} />
        <VaccinationByAge vaccinationObj={vaccinationObj} />
      </div>
    )
  }

  renderVaccinationData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderHeader = () => (
    <div className="bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
        alt="website logo"
      />
      <h1>CoWIN Vaccination in India</h1>
    </div>
  )

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderVaccinationData()}
      </div>
    )
  }
}

export default CowinDashboard
