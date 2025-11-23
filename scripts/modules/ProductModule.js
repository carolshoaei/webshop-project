// Module(s) for the web application

const ProductModule = (() => {
  const foodProducts = [
    {
      id: 1,
      name: "Chipotle",
      price: 55.9,
      image: "images/chipotle-pølse.jpg",
    },
    {
      id: 2,
      name: "Fårikålkjøtt",
      price: 195.0,
      image: "images/fårikålkjøtt.jpg",
    },
    {
      id: 3,
      name: "Grillpølser",
      price: 61.9,
      image: "images/grillpølser.jpg",
    },
    {
      id: 4,
      name: "Karbonadedeig",
      price: 60.0,
      image: "images/karbonadedeig.jpg",
    },
    {
      id: 5,
      name: "Karbonader",
      price: 72.9,
      image: "images/karbonader.jpg",
    },
    {
      id: 6,
      name: "Kyllingkjøttdeig",
      price: 59.9,
      image: "images/kyllingkjøttdeig.jpg",
    },
    {
      id: 7,
      name: "Røkte-kjøttpølser",
      price: 69.9,
      image: "images/røkte-kjøttpølser.jpg",
    },
    {
      id: 8,
      name: "Wienerpølser",
      price: 68.9,
      image: "images/wienerpølser.jpg",
    },
  ];

  const getAll = () => {
    return structuredClone(foodProducts);
  };

  const getByID = (id) => {
    return structuredClone(foodProducts.find((product) => id === product.id));
  };

  return {
    getAll,
    getByID,
  };
})();

export default ProductModule;
