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
      createdAt: new Date(),
      id: crypto.randomUUID(),
      number: number.value,
      item: item.value,
      saved: false,
      show: true,
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
          required
        />
        <input
          className="bg-[#7D81AE] py-3 px-2 w-52 rounded-lg outline-none text-left text-lg placeholder-gray-300/80"
          name="item"
          type="text"
          placeholder="Nome do item"
          required
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

const ItemsList = ({
  items,
  onSaveItem,
  onItemRemove,
  onClearList,
  onReOrder,
}) => {
  const handleReOrderItems = (e) => {
    const mode = e.target.value
    const newArray = items.map((item) => ({ ...item, show: true }))

    switch (mode) {
      case "recent":
        onReOrder(
          newArray.sort(
            (itemA, itemB) =>
              new Date(itemA.createdAt) - new Date(itemB.createdAt),
          ),
        )

        break

      case "saved":
        onReOrder(
          newArray.map((item) =>
            !item.saved ? { ...item, show: false } : item,
          ),
        )
        break

      case "notSaved":
        onReOrder(
          newArray.map((item) =>
            item.saved ? { ...item, show: false } : item,
          ),
        )
        break

      case "alphabetical":
        onReOrder(
          newArray.sort((itemA, itemB) => itemA.item.localeCompare(itemB.item)),
        )
        break
    }
  }

  return (
    <div className="w-full flex-1 flex items-center flex-col justify-between bg-[#E5C3A7]">
      <div className="flex justify-center items-center gap-12 flex-wrap mx-auto max-w-7xl text-white py-9">
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className={`flex gap-6 text-xl text-[#4B527E] items-center font-medium ${
                !item.show && "hidden"
              }`}
            >
              <input
                type="checkbox"
                className="size-5 hover: cursor-pointer"
                onClick={() => onSaveItem(item.id)}
              />
              <p
                className={
                  item.saved && "font-normal line-through text-[#5f68a0]"
                }
              >
                {item.number} {item.item}
              </p>
              <button
                className="hover: cursor-pointer"
                onClick={() => onItemRemove(item.id)}
              >
                ❌
              </button>
            </div>
          )
        })}
      </div>
      <div>
        <select
          className="bg-[#7D81AE] text-white py-3 mb-6 px-2 w-64 rounded-lg text-lg font-bold mr-4"
          onChange={handleReOrderItems}
        >
          <option value="recent">Ordenar por mais recente</option>
          <option value="alphabetical">Ordem alfabética</option>
          <option value="saved">Guardados</option>
          <option value="notSaved">Não guardados</option>
        </select>

        <button
          className="py-3 mb-6 text-white px-2 w-36 bg-[#FF854A] rounded-lg hover:bg-[#ff7f3e] text-lg font-bold"
          onClick={onClearList}
        >
          Limpar Lista
        </button>
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
    <div className=" text-white flex items-center justify-center font-semibold text-2xl w-full min-h-28 bg-[#4B527E]">
      <p>
        {numberOfItems === 0
          ? "Você tem 0 itens na lista"
          : `Você tem ${numberOfItems} ite${
              SingularOrPlural ? "m" : "ns"
            } e já guardou ${numberOfSavedItems} (${percentOfSavedItems}%)`}
      </p>
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

  const handleRemoveItem = (itemId) =>
    setItems((i) => i.filter((item) => item.id !== itemId))

  const handleClearItems = () => setItems([])

  const handleOrderItems = (newList) => setItems(newList)

  return (
    <main className="flex flex-col h-dvh">
      <Header />
      <Form onItemsChange={handleItemsAdd} />
      <ItemsList
        items={items}
        onSaveItem={handleSaveItem}
        onItemRemove={handleRemoveItem}
        onClearList={handleClearItems}
        onReOrder={handleOrderItems}
      />
      <Footer items={items} />
    </main>
  )
}

export { App }
