import {
	useState,
	useRef,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from "react";
import "./toast.css";

const Toast = forwardRef((props, ref) => {
	const [toasts, setToasts] = useState([]);
	const timerRef = useRef({});

	useEffect(() => {
		return () => {
			// Clean up timers on unmount to avoid memory leaks
			Object.values(timerRef.current).forEach(clearTimeout);
		};
	}, []);

	const handleClose = (id) => {
		clearTimeout(timerRef.current[id]);
		delete timerRef.current[id];
		setToasts((prevToasts) =>
			prevToasts.filter((toast) => toast.id !== id)
		);
	};

	const handleAdd = (msg, type) => () => {
		const id = new Date().getTime();
		const newToast = [...toasts, { id, msg, type }];
		setToasts(newToast);
		timerRef.current[id] = setTimeout(() => handleClose(id), 5000);
	};

	useImperativeHandle(ref, () => ({
		addToast: handleAdd,
	}));

	return (
		<div className="container">
			<div className="toast-container">
				{toasts.map(({ id, msg, type }) => (
					<div key={id} className={`toast ${type}`}>
						{msg} <span onClick={() => handleClose(id)}> X </span>
					</div>
				))}
			</div>
		</div>
	);
});

export default Toast;
