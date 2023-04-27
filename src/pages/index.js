import { useEffect, useState } from 'react'

export default function Home() {
  const [boxes, setBoxes] = useState([])
  const [data, setData] = useState({"": "Select or create a page on the left side bar"})
  const [selectedBox, setSelectedBox] = useState('')
  

  useEffect(() => {
    const boxes = localStorage.getItem('boxes')
    if (boxes) {
      setBoxes(JSON.parse(boxes))
    }

    const selectedBox = localStorage.getItem('selectedBox')
    // console.log(selectedBox)
    if (selectedBox) {
      setSelectedBox(selectedBox)
    }

    const data = localStorage.getItem('data')
    // console.log(data)
    if (data) {
      setData(JSON.parse(data))
    }
  }, [])

  const onFormSubmit = e => {
    e.preventDefault();

    const newBox = e.target[0].value

    // Check if box already exists
    if (boxes.includes(newBox)) {
      alert('Box already exists')
      return
    }
    if (newBox) {
      setBoxes([...boxes, newBox])
    }
    e.target[0].value = ''

    setData({...data, [newBox]: ''})
    localStorage.setItem('boxes', JSON.stringify([...boxes, newBox]))
  }


  return (
    <main className="bg-slate-900 flex flex-row grow h-full w-full p-2 pl-4" data-id="main-container">

      <div className="flex flex-col h-full pr-4 overflow-y-auto" data-id="sidebar">
        <div>
          <div className="flex flex-row mt-4">
            
          <svg className="w-5 h-5 self-center my-auto fill-white" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="LockOpenIcon" aria-label="fontSize large"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"></path></svg>
          <h1 className="text-white font-bold text-xl ml-2">
            LockBox
          </h1>
          </div>
          
          <p className="text-slate-400 mb-3 mt-2">
            Stop sending yourself emails with your passwords
          </p>
          <a className="mr-1 opacity-80 hover:opacity-100" href="https://www.ronald-luo.com/100-websites/">
            <svg className="fill-green-500 w-6 h-6 inline-block" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="HomeIcon" aria-label="fontSize large"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg>
          </a>
          <a className="ml-1 opacity-80 hover:opacity-100" href="https://github.com/ronald-luo/lock-box">
            <svg className="fill-green-500 w-5 h-5 inline-block" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="GitHubIcon" aria-label="fontSize large"><path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"></path></svg>
          </a>
        </div>

        <div className="flex flex-col ">
          <h2 className="text-white font-bold text-md mt-4 mb-2">
            Your Offline Boxes
          </h2>

          <form className="px-0 ml-1" onSubmit={onFormSubmit}>
            <input className="placeholder:italic placeholder:text-slate-400 block bg-slate-800 text-white rounded-md py-2 pl-3 w-full shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Create New Box..." type="text"/>
          </form>

          <div className="flex flex-col mt-2">
            {boxes.map((box, index) => (
              <div key={index} style={{backgroundColor: selectedBox === box ? '#65A30D' : '#1E313B'}} className="ml-1 flex flex-row justify-between items-center bg-slate-800 rounded-md px-3 my-1 py-2 ring-1 ring-slate-900/5 shadow-xl cursor-pointer" 
                onClick={() => {
                    setSelectedBox(box)
                    localStorage.setItem('selectedBox', box)
                  }
                }>
                <h3 className="text-slate-900 font-lg dark:text-white w-5/6 truncate align-center text-base font-medium tracking-tight">
                  {box}
                </h3>
                <button className="align-center font-lg dark:text-red-500 text-base font-medium tracking-tight" 
                onClick={(e) => {
                  e.stopPropagation()
                  const newBoxes = boxes.filter(b => b !== box)
                  setBoxes(newBoxes)
                  localStorage.setItem('boxes', JSON.stringify(newBoxes))
                  setData({...data, [box]: undefined})
                  localStorage.setItem('data', JSON.stringify({...data, [box]: undefined}))
                  setSelectedBox('')
                  localStorage.setItem('selectedBox', '')
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 hover:text-red-600" viewBox="0 0 20 20" fill="currentColor" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CancelIcon" aria-label="fontSize large"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grow w-full basis-full" data-id="">
        <div className="h-full bg-slate-800 rounded-lg px-3 py-2 ring-1 ring-slate-900/5 shadow-xl">
          <h3 className="text-slate-900 text-lg dark:text-white mt-2 text-base font-medium tracking-tight">
            {selectedBox !== '' ? selectedBox : 'Create a box to get started'}
          </h3>
          <textarea className="align-top outline-none w-full h-5/6 text-slate-500 bg-slate-800 dark:text-slate-400 mt-2 text-sm" type="text" 
            value={data[selectedBox]}
            onChange={e => {
              setData({...data, [selectedBox]: e.target.value})
              localStorage.setItem('data', JSON.stringify({...data, [selectedBox]: e.target.value}))
            }}
          placeholder="Enter your data here..."/>
        </div>


      </div>

    </main>
  )
}
