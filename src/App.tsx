import type { Component } from 'solid-js'
import { createSignal, For, createMemo } from 'solid-js'

const Tabs: Component = () => {
  let tabInfos: Array<chrome.tabs.Tab> = []
  const [searchTerm, setSearchTerm] = createSignal("")
  const [tabs, setTabs] = createSignal(tabInfos)
  chrome.tabs.query({ currentWindow: true }, (ts: Array<chrome.tabs.Tab>) => {
    console.log(ts.length)
    setTabs(ts)
  })

  const handleClick = (id: number) => {
    chrome.tabs.update(id, { 'active': true }, (tab) => { })
  }

  const handleClose = async (id: number) => {
    await chrome.tabs.remove(id)
    await handleReflesh()
  }

  const filteredItems = createMemo(() => {
    const term = searchTerm().toLowerCase();
    return tabs()
      .filter(tab => tab.title!.toLowerCase().includes(term))
  })

  const handleReflesh = () => {
    chrome.tabs.query({ currentWindow: true }, (ts: Array<chrome.tabs.Tab>) => {
      setTabs(ts)
    })
  }

  return (
    <div class="max-w-md mx-auto">
      <div class="flex items-center">
        <button onClick={handleReflesh}
          class="h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">Reflesh</button>
        <input
          type="text"
          placeholder="検索"
          value={searchTerm()}
          onInput={(e) => setSearchTerm(e.currentTarget.value)}
          class="p-2 border border-gray-300 rounded mb-4 mt-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <For each={filteredItems()}>{(tab =>
        <div class="bg-white shadow-md rounded-lg overflow-hidden mb-1 flex items-center">
          <img src={tab.favIconUrl} alt="Example" class="w-5 h-5 m-4"></img>
          <a class="cursor-pointer flex-1 p-4 hover:bg-gray-50 flex items-center" onClick={() => handleClick(tab.id!)}>
            <div class="ml-4">
              <p class="text-gray-600">{tab.title}</p>
            </div>
          </a>
          <button onClick={() => handleClose(tab.id!)}
            class="h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 bg-jordy-blue-700 rounded-lg focus:shadow-outline hover:bg-jordy-blue-800">Close</button>
        </div>
      )}
      </For>
    </div>
  )
}

const App: Component = () => {
  return (
    <>
      <div>
        <Tabs />
      </div>
    </>
  )
}

export default App;
