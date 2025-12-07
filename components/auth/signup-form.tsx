
import { Mail, Lock, ArrowRight, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '@radix-ui/react-label';
import { Logo } from '../ui/logo';
import Link from "next/link";

export default function SignupForm() {

    
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-transparent">
    <Logo />
    <form>
      <Card className="w-[450px] " >
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Utwórz konto</CardTitle>
          <CardDescription className="text-sm text-white">Zacznij zarządzać swoimi finansami już dziś.</CardDescription>
        </CardHeader>
        <CardContent>
          
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name" className="font-medium text-slate-300 mb-2">Imie i nazwisko</Label>
                    <div className="relative">
                        <Input id="name" placeholder="Jan Kowalski" />
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email" className="font-medium text-slate-300 mb-2">Email</Label>
                    <div className="relative">
                        <Input id="email" placeholder="jan@przyklad.pl" />
                        <Mail className="absolute top-1/2 left-2 transform -translate-y-1/2 text-slate-400" />
                    </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password" className="font-medium text-slate-300 mb-2">Hasło</Label>
                    <div className="relative">
                        <Input className='' id="password" type="password" placeholder="******" />
                        <Lock className="absolute top-1/2 left-2 transform -translate-y-1/2 text-slate-400" />
                    </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="passwordConfirm" className="font-medium text-slate-300 mb-2">Potwierdź hasło</Label>
                    <div className="relative">
                        <Input className='' id="passwordConfirm" type="password" placeholder="******" />
                        <Lock className="absolute top-1/2 left-2 transform -translate-y-1/2 text-slate-400" />
                    </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="passwordConfirm" className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex-shrink-0 mt-0.5">
                        <Input className='w-5 h-5 rounded border-2 border-slate-700 bg-slate-800/50 checked:bg-indigo-500 checked:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 focus:ring-2 focus:ring-indigo-500/50 transition-all  cursor-pointer' id="agreements" type="checkbox" />
                </div>
                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                  Akceptuję{' '}
                  <a href="#" className="text-indigo-400 hover:text-indigo-300 font-medium">
                    regulamin
                  </a>
                  {' '}i{' '}
                  <a href="#" className="text-indigo-400 hover:text-indigo-300 font-medium">
                    politykę prywatności
                  </a>
                </span>
                    
                    </Label>
                </div>
            </div>
          
        </CardContent>
        <CardFooter className="flex flex-col py-5 justify-between">
          <Button className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-slate-700 disabled:to-slate-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:shadow-none group">               <div className="flex items-center justify-center gap-2">
                  <span>Utwórz konto</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div></Button>
                          <div className="mt-8 text-center">
            <p className="text-slate-400">
              Masz już konto?{' '}
              <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                Zaloguj się
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
      </form>
    </div>
  )
}