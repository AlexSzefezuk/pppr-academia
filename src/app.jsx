import { useState } from "react"

const Form = ({ onItemsChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault()

    const { number, item } = e.target

    onItemsChange({
      id: crypto.randomUUID(),
      number: number.value,
      item: item.value,
      saved: false,
    })
  }

  return (
    <div className="w-full bg-[#4B527E]">
      <form
        className="flex justify-center items-center gap-3 mx-auto max-w-7xl text-white py-7"
        onSubmit={handleSubmit}
      >
        <p className="text-2xl text-center font-semibold">
          O que você precisa guardar?
        </p>
        <input
          className="bg-[#7D81AE] py-3 px-2 w-20 rounded-lg outline-none text-center text-lg placeholder-gray-200"
          name="number"
          type="Number"
          min={1}
          placeholder="2"
        />
        <input
          className="bg-[#7D81AE] py-3 px-2 w-52 rounded-lg outline-none text-left text-lg placeholder-gray-200"
          name="item"
          type="text"
          placeholder="Nome do item"
        />
        <button
          className="py-3 px-2 w-36 bg-[#FF6086] rounded-lg hover:bg-[#fc446f] text-lg font-bold"
          type="submit"
        >
          Adicionar
        </button>
      </form>
    </div>
  )
}

const ItemsList = ({ items, onSaveItem, onItemRemove }) => {
  return (
    <div className="w-full h-96 bg-[#E5C3A7]">
      <div className="flex justify-center items-center gap-12 flex-wrap mx-auto max-w-7xl text-white py-9">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-2 text-xl text-[#4B527E] items-center font-medium "
          >
            <input
              type="checkbox"
              className="size-5 hover: cursor-pointer"
              onClick={() => onSaveItem(item)}
            />
            <p className={item.saved && "font-normal text-[#5f68a0]"}>
              {item.number}
            </p>
            <p
              className={
                item.saved && "line-through font-normal text-[#5f68a0]"
              }
            >
              {item.item}
            </p>
            <span
              className="hover: cursor-pointer"
              onClick={() => onItemRemove(item.id)}
            >
              ❌
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const App = () => {
  const [items, setItems] = useState([])
  const handleItemsAdd = (newItem) => setItems((i) => [...i, newItem])
  const handleSaveItem = (item) =>
    setItems((i) =>
      i.map((i) => (i.id === item.id ? { ...item, saved: !item.saved } : item)),
    )
  // const removeItem = (itemId = setItems((i) =>
  //   i.filter((item) => item.id !== itemId),
  // ))

  const removeItem = (itemId) => {
    setItems((i) => i.filter((item) => item.id !== itemId))
  }

  return (
    <main>
      <Form onItemsChange={handleItemsAdd} />
      <ItemsList
        items={items}
        onSaveItem={handleSaveItem}
        onItemRemove={removeItem}
      />
    </main>
  )
}

export { App }
