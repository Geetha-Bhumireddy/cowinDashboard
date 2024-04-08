// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByGender = props => {
  const {vaccinationObj} = props
  const {vaccinationByGender} = vaccinationObj
  const data = vaccinationByGender

  return (
    <div>
      <h1>Vaccination by gender</h1>
      <PieChart width={300} height={300}>
        <Pie
          cx="50%"
          cy="60%"
          data={data}
          startAngle={180}
          endAngle={0}
          innerRadius="30%"
          outerRadius="60%"
          dataKey="count"
        >
          <Cell name="Male" fill="#fecba6" />
          <Cell name="Female" fill="#b3d23f" />
          <Cell name="Others" fill="#a44c9e" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByGender
