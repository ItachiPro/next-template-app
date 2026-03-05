const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto grid min-h-screen max-w-6xl lg:grid-cols-2">
        {/* Left / Brand */}
        <div className="relative hidden lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-fuchsia-600/10 to-cyan-400/10" />
          <div className="relative flex w-full flex-col justify-between p-10">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                <span className="text-lg font-semibold">S</span>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-200">Stan Suite</p>
                <p className="text-xs text-zinc-400">Admin & Discounts</p>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-semibold leading-tight">
                Welcome back.
                <span className="block text-zinc-300">
                  Sign in to continue.
                </span>
              </h1>
              <p className="max-w-md text-sm text-zinc-400">
                Secure access, fast UI, and everything ready to manage your
                product.
              </p>

              <div className="mt-6 grid gap-3 text-sm text-zinc-300">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-emerald-400/80" />
                  <p>Secured token-based authentication.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-indigo-400/80" />
                  <p>Role and Permission management built to scale.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-cyan-400/80" />
                  <p>Responsive and accessible design.</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-zinc-500">
              © {new Date().getFullYear()} Stan Suite. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right / Form */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
