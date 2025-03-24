import { useState } from "react";
import ButtonVoice from "../../components/ButtonVoice";
import ProductsList from "../Products/ProductsList";

const Home = () => {
  const [getData, setGetData] = useState(false);

  return (
    <div>
      <h2>Compritas</h2>
      <p>Compritas, una app para facilitar tus compras en Cordiez :)</p>
      <br />
      <br />
      <p>
        Haga click en el micrófono y nombra los productos que deseas comprar.
      </p>
      <ButtonVoice setGetData={setGetData} />
      <br />
      <br />
      {getData && <ProductsList />}
    </div>
  );
};

export default Home;
