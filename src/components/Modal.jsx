import "./Modal.css";

function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // evitar cerrar al tocar dentro
      >
        <button className="modal-close" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
