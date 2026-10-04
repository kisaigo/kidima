import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type DemoAccount = {
  name: string;
  phone: string;
  artisanEnabled: boolean;
};

type AccountContextValue = {
  account: DemoAccount;
  enableArtisanMode: () => void;
};

const AccountContext = createContext<AccountContextValue | null>(null);

export function AccountProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<DemoAccount>({
    name: "Compte de démonstration",
    phone: "Non renseigné",
    artisanEnabled: false,
  });
  const value = useMemo(
    () => ({
      account,
      enableArtisanMode: () => setAccount((current) => ({ ...current, artisanEnabled: true })),
    }),
    [account],
  );

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useDemoAccount() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useDemoAccount doit être utilisé dans AccountProvider.");
  }
  return context;
}
