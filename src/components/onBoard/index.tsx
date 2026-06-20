
import { useState } from 'react';
import Form from './form';
import ConfettiStore from '../confetti';
import Button from '@/components/ui/button/Button';

export default function OnBoard() {
  const [activeConfetti, setActiveConfetti] = useState(false);
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      {!showModal ? null : (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white/70 backdrop-blur-sm dark:bg-gray-950/70">
          <div className="mx-auto w-full max-w-xl px-4 py-10 sm:py-16">
            {!activeConfetti ? (
              <div className="rounded-2xl border border-gray-200 bg-white shadow-theme-xs dark:border-gray-800 dark:bg-gray-900">
                <div className="px-6 py-5">
                  <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                    Crie sua Loja
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Em poucos passos, você terá seu catálogo digital pronto para exibir produtos e
                    vitrines de forma personalizada. Crie sua primeira loja para começar.
                  </p>
                </div>
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
                  <Form activeConfetti={setActiveConfetti} />
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-gray-200 bg-white shadow-theme-xs dark:border-gray-800 dark:bg-gray-900">
                <div className="px-6 py-5">
                  <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                    Parabéns 🎉
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sua loja foi criada com sucesso! Agora você pode começar a cadastrar produtos e
                    criar sua primeira vitrine para exibir seus produtos de forma personalizada.
                  </p>
                </div>
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() => {
                      setShowModal(false);
                      setActiveConfetti(false);
                    }}
                  >
                    Começar a cadastrar produtos
                  </Button>
                </div>
              </div>
            )}
          </div>

          {activeConfetti && <ConfettiStore />}
        </div>
      )}
    </>
  );
}
