import { useState } from "react"

const Header = () => (
  <header className="flex items-center gap-2 justify-center py-5 bg-[#2E4274]">
    <img className="" src="./logo-espaco-mulher.png" alt="Logo Espaço mulher" />
    <h1 className="text-[#E5C3A7] font-bold text-7xl leading-tight tracking-tight ">
      Espaço Mulher
    </h1>
  </header>
)

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
          className="bg-[#7D81AE] py-3 px-2 w-20 rounded-lg outline-none text-center text-lg placeholder-gray-300/80"
          name="number"
          type="Number"
          min={1}
          placeholder="1"
        />
        <input
          className="bg-[#7D81AE] py-3 px-2 w-52 rounded-lg outline-none text-left text-lg placeholder-gray-300/80"
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
    <div className="w-full h-screen bg-[#E5C3A7]">
      <div className="flex justify-center items-center gap-12 flex-wrap mx-auto max-w-7xl text-white py-9">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-2 text-xl text-[#4B527E] items-center font-medium "
          >
            <input
              type="checkbox"
              className="size-5 hover: cursor-pointer"
              onClick={() => onSaveItem(item.id)}
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

const Footer = ({ items }) => {
  const numberOfItems = items.length
  const numberOfSavedItems = items.filter((item) => item.saved).length
  const percentOfSavedItems = Math.floor(
    (numberOfSavedItems / numberOfItems) * 100,
  )
  const SingularOrPlural = numberOfItems === 1 ? true : false

  return (
    <div className=" text-white flex items-center justify-center font-semibold text-2xl w-full h-28 bg-[#4B527E]">
      <p>{`Você tem ${numberOfItems} ite${
        SingularOrPlural ? "m" : "ns"
      } e já guardou ${numberOfSavedItems} (${percentOfSavedItems}%)`}</p>
    </div>
  )
}

const App = () => {
  const [items, setItems] = useState([])
  const handleItemsAdd = (newItem) => setItems((i) => [...i, newItem])
  const handleSaveItem = (itemId) =>
    setItems((i) =>
      i.map((item) =>
        item.id === itemId ? { ...item, saved: !item.saved } : item,
      ),
    )

  const removeItem = (itemId) =>
    setItems((i) => i.filter((item) => item.id !== itemId))

  return (
    <main>
      <Header />
      <Form onItemsChange={handleItemsAdd} />
      <ItemsList
        items={items}
        onSaveItem={handleSaveItem}
        onItemRemove={removeItem}
      />
      <Footer items={items} />
    </main>
  )
}

export { App }
