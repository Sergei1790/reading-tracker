import { signIn } from '@/auth';

export default function SignInPage() {
    return(
        <main className="min-h-screen flex items-center justify-center">
        <div className="backdrop-blur-md bg-sky-950/80 border border-blue-500/20 rounded-xl p-8 w-full max-w-sm space-y-4">
            <h1 className="text-2xl font-bold text-blue-200 text-center">Reading Tracker</h1>
            <p className="text-slate-400 text-center text-sm">Sign in to continue</p>

            <form action={async () => { 'use server'; await signIn('github', { redirectTo: '/' }); }}>
            <button type="submit" className="w-full bg-sky-600/80 hover:bg-sky-500/80 text-white py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2">
                Sign in with GitHub
            </button>
            </form>

            <form action={async () => { 'use server'; await signIn('google', { redirectTo: '/' }); }}>
            <button type="submit" className="w-full bg-sky-600/80 hover:bg-sky-500/80 text-white py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2">
                Sign in with Google
            </button>
            </form>
        </div>
        </main>
    );
}