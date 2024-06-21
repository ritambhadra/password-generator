import { useState, useCallback, useRef, useEffect } from "react";

function App() {
	const [length, setLength] = useState(6);
	const [numAllowed, setNumAllowed] = useState(false);
	const [charAllowed, setCharAllowed] = useState(false);
	const [password, setPassword] = useState("");

	//useRef hook
	const passwordRef = useRef(null);

	const passwordGenerator = useCallback(() => {
		let pass = "";
		let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		if (numAllowed) str += "0123456789";
		if (charAllowed) str += "!@#$%^&*";

		for (let i = 1; i <= length; i++) {
			let char = Math.floor(Math.random() * str.length + 1);
			pass += str.charAt(char);
		}
		setPassword(pass);
	}, [length, numAllowed, charAllowed, setPassword]);

	const copyPasswordToClipboard = useCallback(() => {
		passwordRef.current?.select();
		passwordRef.current?.setSelectionRange(0, 999);
		window.navigator.clipboard.writeText(password);
	}, [password]);

	useEffect(() => {
		passwordGenerator();
	}, [length, numAllowed, charAllowed, passwordGenerator]);

	return (
		<div className="w-full max-w-md mx-auto shadow-md rounded-xl px-4 py-4 my-20 bg-gray-800">
			<h1 className="text-orange-400 text-center my-4 text-3xl">
				Password Generator
			</h1>
			<div className=" shadow overflow-hidden mb-5 gap-y-5">
				<input
					type="text"
					value={password}
					placeholder="Password"
					className="outline-none w-full py-3 px-3 text-xl rounded-lg text-center"
					readOnly
				/>
			</div>
			<div className="w-full flex justify-center max-w-md mx-auto px-2 py-3 ">
				<button
					onClick={copyPasswordToClipboard}
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg mr-2.5 px-5 py-3  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					copy
				</button>

				<button
					onClick={passwordGenerator}
					className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg ml-2.5 px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					refresh
				</button>
			</div>
			<div className="flex text-lg gap-x-4 text-orange-400">
				<div className="flex items-center gap-x-1">
					<input
						type="range"
						min={6}
						max={18}
						value={length}
						className="cursor-pointer"
						onChange={(e) => {
							setLength(e.target.value);
						}}
					/>
					<label>Length: {length}</label>
				</div>
				<div className="flex flex-col">
					<div className="flex items-center gap-x-1">
						<input
							type="checkbox"
							defaultChecked={numAllowed}
							id="numberInput"
							onChange={() => {
								setNumAllowed((prev) => !prev);
							}}
						/>
						<label htmlFor="numberInput">Numbers</label>
					</div>
					<div className="flex items-center gap-x-1">
						<input
							type="checkbox"
							defaultChecked={charAllowed}
							id="characterInput"
							onChange={() => {
								setCharAllowed((prev) => !prev);
							}}
						/>
						<label htmlFor="characterInput">Characters</label>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
