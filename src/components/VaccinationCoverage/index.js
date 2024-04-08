import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

const VaccinationCoverage = props => {
  const {vaccinationObj} = props
  const {last7DaysVaccination} = vaccinationObj

  // Transform data into the format expected by Recharts
  const data = last7DaysVaccination

  const DataFormatter = number => {
    if (number >= 1000) {
      return `${(number / 1000).toString(0)}k`
    }

    return number.toString()
  }

  return (
    <div>
      <h1>Vaccination Coverage</h1>
      <BarChart
        width={900}
        height={400}
        data={data}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccineDate" // Changed from "group_name" to "vaccineDate"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar dataKey="dose1" name="Dose1" fill="#1f77b4" barSize="20%" />{' '}
        {/* Changed from "boys" to "dose1" */}
        <Bar dataKey="dose2" name="Dose2" fill="#fd7f0e" barSize="20%" />{' '}
        {/* Changed from "girls" to "dose2" */}
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
