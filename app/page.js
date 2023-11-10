import React from "react";

const Home = () => {
  // Changed 'for' to 'htmlFor' for better compatibility
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl font-bold text-center text-white">
        Currency Converter
      </h1>
      <div className="flex flex-col items-center justify-center">
        <form action="">
          <label htmlFor="cars">Choose a car:</label>
          <br />
          <select name="cars" id="cars" className="mt-2">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
          <label htmlFor="cars">Choose a car:</label>
          <br />
          <select name="cars" id="cars" className="mt-2">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
          <br />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default Home;
