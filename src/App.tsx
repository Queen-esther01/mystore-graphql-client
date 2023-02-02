import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Toaster } from 'react-hot-toast';
import Cart from './pages/Cart';

const client = new ApolloClient({
	uri: 'https://mystore-graphql-server-production.up.railway.app/',
	cache: new InMemoryCache(),
})



function App() {
	return (
		<BrowserRouter>
			<ApolloProvider client={client}>
				<Toaster
					position="top-center"
				/>
				<Routes>
					<Route path="/" element={<Home />}/>
					<Route path="/product/:id" element={<Product/>} />
					<Route path='/cart' element={<Cart/>} />
				</Routes>
			</ApolloProvider>
		</BrowserRouter>
	);
}

export default App;
