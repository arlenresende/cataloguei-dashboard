import GridShape from "../../components/common/GridShape";
import {  Outlet } from "react-router-dom";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
import { ShoppingBag } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">

        <Outlet />

        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div className="relative flex items-start justify-center z-1">
            <GridShape />

            <div className="flex flex-col gap-8 items-start">
                <div className="flex items-start justify-start gap-4 text-white">
                  <a href="/" className="flex items-start gap-2 justify-start">
                    <ShoppingBag size={32} />
                    <span className="text-2xl font-bold">Cataloguei</span>
                  </a>
                </div>

               
                <div className="space-y-4 max-w-md text-white">
                  <blockquote className="text-lg font-medium text-balance leading-relaxed">
                    "Esta plataforma transformou completamente a forma como gerenciamos nosso negócio.
                    Aumentamos nossas vendas em 300% no primeiro mês."
                  </blockquote>
                  <div className="flex items-center gap-3 justify-start">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                      MS
                    </div>
                    <div>
                      <p className="font-semibold">Maria Silva</p>
                      <p className="text-sm text-white/80">CEO, Empresa XYZ</p>
                    </div>
                  </div>
                </div>

               
                <div className="text-sm text-white/70">
                  © 2025 Cataloguei. Todos os direitos reservados.
                </div>
            </div>
          </div>
        </div>

        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}