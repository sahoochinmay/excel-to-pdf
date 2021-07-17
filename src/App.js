import React,{useState} from 'react'

const App = () => {
  const [excelFile ,setExcelFile] = useState()
  console.log(excelFile)
  return (
    <div>
      <input 
      type="file" 
      accept=".xlsx"
      onChange={(e) => setExcelFile(e.target.files[0])}
      />
    </div>
  )
}

export default App
