import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import './styles.css'

type ModalProps = {
  title?: string
  description?: string
  children: React.ReactNode
}

const Modal = ({ title, description, children }: ModalProps) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className='Button violet'>Edit profile</button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className='DialogOverlay' />
      <Dialog.Content className='DialogContent'>
        <Dialog.Title className='DialogTitle'>{title}</Dialog.Title>
        <Dialog.Description className='DialogDescription'>{description} </Dialog.Description>
        {children}
        <Dialog.Close asChild>
          <button className='IconButton' aria-label='Close'>
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)

export default Modal
