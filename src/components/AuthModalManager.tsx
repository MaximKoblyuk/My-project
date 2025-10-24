'use client'

import { useState } from 'react'
import { LoginModal } from './LoginModal'
import { RegistrationModal } from './RegistrationModal'

interface AuthModalManagerProps {
  children: (props: {
    openLogin: () => void
    openRegister: () => void
    closeAuth: () => void
  }) => React.ReactNode
}

export function AuthModalManager({ children }: AuthModalManagerProps) {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const openLogin = () => {
    setShowRegister(false)
    setShowLogin(true)
  }

  const openRegister = () => {
    setShowLogin(false)
    setShowRegister(true)
  }

  const closeAuth = () => {
    setShowLogin(false)
    setShowRegister(false)
  }

  return (
    <>
      {children({ openLogin, openRegister, closeAuth })}
      
      <LoginModal
        isOpen={showLogin}
        onClose={closeAuth}
        onSwitchToRegister={openRegister}
      />
      
      <RegistrationModal
        isOpen={showRegister}
        onClose={closeAuth}
        onSwitchToLogin={openLogin}
      />
    </>
  )
}