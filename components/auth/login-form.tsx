
import { Mail, Lock, Chrome, Github, Apple, Wallet, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '@radix-ui/react-label';
import { Logo } from '../ui/logo';
import Link from "next/link";


export default function LoginForm() {

    
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-transparent">
    <Logo />
      <Card className="w-[450px] " >
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Logowanie</CardTitle>
          <CardDescription className="text-sm text-white">Wpisz swoje dane, aby wejść.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
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
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col py-5 justify-between">
          <Button className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-slate-700 disabled:to-slate-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:shadow-none group">               <div className="flex items-center justify-center gap-2">
                  <span>Zaloguj się</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div></Button>
                          <div className="mt-8 text-center">
            <p className="text-slate-400">
              Nie masz konta?{' '}
              <Link href="/signup" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                Zarejestruj się
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}