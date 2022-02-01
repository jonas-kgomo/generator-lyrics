import Head from 'next/head'
import { useState, useEffect, ChangeEventHandler, ChangeEvent } from 'react'

export default function Home() {
  const [data, setData] = useState({ text: '' })

  const [query, setQuery] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true) 

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        setIsLoading(true)
        const res = await fetch(`/api/openapi`, {
          body: JSON.stringify({
            name: search,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
        const data = await res.json()
        console.log('Data' + data)
        setData(data)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [search])

  const input = ['davinci', 'ada', 'curie', 'darwin']
  const apiControls = { 
    maxTokens: "50",
    temperature: "0.7",
    topP: "1",
		topK: "2",
    presencePenalty: "0",
    frequencyPenalty: "0.5",
    bestOf: 1,
    n: 1,
  }

  return (
    <div className="flex bg-gray-100 min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Anthropic</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

			<header className="bg-yellow-700 flex h-8 md:h-24 w-full items-center justify-center border-0">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          FE Interview{' '}
          <img
            src="https://www.anthropic.com/static/media/AnthropicLogotypeSlate.7169e39d.svg"
            alt="Vercel Logo"
            className="ml-2 h-4"
          />
        </a>
      </header>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-0 text-center">
        <div className="mt-6 flex max-w-4xl md:max-w-6xl flex-wrap items-center  justify-around bg-gray-100 sm:w-full border-l border-r">
          <div className='p-4 m-4'>
            <div className='uppercase m-4 p-4 text-xl font-semibold'>Controls</div>
            <table className="text-left bg-gray justify-around">
              <tr>
                Server{' '}
                <select className="rounded-md m-1 p-2">
                  {input.map((e) => (
                    <option>{e}</option>
                  ))}
                </select>
              </tr>
             
              <tr>
                Top k <input type="number" placeholder={apiControls.topK} className="m-2 w-8 text-center rounded-lg" />
              </tr>
              <tr>
                Top p <input type="number" placeholder={apiControls.topP} className="m-2 w-8 text-center rounded-lg" />
              </tr>
              <tr>
                Temp <input type="number" placeholder={apiControls.temperature} className="m-2 w-10 text-center rounded-lg" />
              </tr>
              <tr>
                Sample Length <input type="number" placeholder={apiControls.presencePenalty} className="m-1 w-8 text-center rounded-lg" />
              </tr>
              <tr>
                Stop Sequence <input type="number" placeholder={apiControls.frequencyPenalty} className="m-1 w-10 text-center rounded-lg" />
              </tr>
            </table>
          </div>

          <div>
					<div className='uppercase  m-4 p-4 text-xl font-semibold'>Composer</div>
            {/* table */}
            <table className='auto'>
              <div className="w-full md:w-96 w-72 rounded-lg bg-gray-100 ">
                 
                <tr>
                  
                </tr>
                <tr className="grid">
                  <textarea
                    //  type="text"
                    value={query}
                    placeholder="Generate a new song lyrics, enter artist name here "
                    onChange={(event: any) => setQuery(event?.target?.value)}
                    className=" bg-gray p-2 w-full rounded-md text-gray-400 active:border-purple-600 caret-purple-400"
                  >
                    {/* <p  className='bg-gray'> */}
                    
                    {/* </p> */}
                  </textarea>
                  <div className='bg-white p-1  '>
                    <div className="text-gray-500 text-left p-1">
                      Current Artist 🎵 <i>{search}</i>
                      {isLoading ? (
                        <div className='flex'>
													{/* loading animation  */}
													Loading <div className="w-2 h-2 bg-black m-1 p-1 border-4 border-black border-solid rounded-full animate-pulse"/>
												</div>
                      ) : (
                        <span className="text-wrap w-full italic md:text-base text-sm p-1"> <br/> {data.text}</span>
                      )}
                    </div>
                  </div>

                  <button
                    className="m-4 mx-4 md:p-3 justify-around text-white rounded-lg bg-black p-2 p-1 "
                    onClick={() => setSearch(query)}
                  >
                    Generate{' '}
                  </button>
                </tr>
              </div>
            </table>
          </div>
        </div>
      </main>

      
    </div>
  )
}
