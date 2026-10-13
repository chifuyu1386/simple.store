import { useEffect, useState } from "react"
import { getProducts } from "./services/productService."
import type { ProductsResponse } from "./types/product"

function App () {
  const [data, setData] = useState<ProductsResponse | null>(null)

  useEffect(() => {
    getProducts({limit: 3}).then((res) => {
      console.log("محصولات:", res)
      setData(res)
    })
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">تست API</h1>
      {!data && <p>در حال بارگزاری</p>}
      {data && (
        <ul>
          {data.products.map((p) => (
            <li key={p.id}>
              {p.title} - ${p.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App