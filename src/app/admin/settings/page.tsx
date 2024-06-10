import ShippingMethodCard from '@/components/settings/shipping-method'


export default async function SettingsPage() {

  return (
    <>
      <h1 className="text-3xl font-bold my-4">Settings</h1>
      <div className="grid grid-cols-2">
        <ShippingMethodCard />
      </div>
      
    </>
  )
}
