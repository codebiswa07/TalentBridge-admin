import React, { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ title, onClose, children, size = 'md' }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const h = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', h) }
  }, [onClose])

  return (
    <div className="modal-bd" onClick={onClose}>
      <div className={`modal-box modal-${size}`} onClick={e => e.stopPropagation()}>
        <div className="modal-hd">
          <h3>{title}</h3>
          <button className="modal-x" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}
