// Write your code here
// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByAge = props => {
  const {vaccinationObj} = props
  const {vaccinationByAge} = vaccinationObj
  const data = vaccinationByAge

  return (
    <div>
      <h1>Vaccination by Age</h1>
      <PieChart width={300} height={200}>
        <Pie
          cx="50%"
          cy="60%"
          data={data}
          startAngle={0}
          endAngle={360}
          innerRadius="0%"
          outerRadius="60%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#fecba6" />
          <Cell name="44-60" fill="#b3d23f" />
          <Cell name="Above 60" fill="#a44c9e" />
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

export default VaccinationByAge
