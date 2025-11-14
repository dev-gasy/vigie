import type { User } from '@dgig-vigie/types'
import { type LoaderFunction, useLoaderData } from 'react-router'
import { queryClient } from '~/lib/query-client'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Building2, Mail, MapPin } from 'lucide-react'
import { Avatar, AvatarFallback } from '~/components/ui/avatar'
import { BackButton } from '~/components/ui/back-button'

export const loader: LoaderFunction = async ({ params }) => {
  const id = parseInt(params.id as string)

  if (isNaN(id)) {
    throw new Response('Invalid user ID', { status: 400 })
  }

  try {
    const user = await queryClient.getUserById(id)
    return { user }
  } catch (error) {
    console.error(`Failed to fetch user ${id}:`, error)
    throw new Response('User not found', { status: 404 })
  }
}

export function meta({ data }: { data: { user: User } }) {
  return [
    { title: `${data.user?.name || 'User'} - User Details` },
    { name: 'description', content: `Details for ${data.user?.name}` },
  ]
}

export default function UserDetailsPage() {
  const { user } = useLoaderData<{ user: User }>()

  return (
    <div className="py-8">
      <BackButton to="/users" label="Back to Users" />

      <div className="max-w-6xl">
        <Card className="mb-8">
          <CardHeader className="pb-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-xl">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl font-bold tracking-tight">
                  {user.name}
                </CardTitle>
                <p className="text-muted-foreground mt-1">@{user.username}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-2 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Email
                  </label>
                  <p className="text-foreground">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Phone
                  </label>
                  <p className="text-foreground">{user.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Website
                  </label>
                  <p className="text-foreground">{user.website}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Address</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Street
                  </label>
                  <p className="text-foreground">
                    {user.address.street}, {user.address.suite}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    City
                  </label>
                  <p className="text-foreground">
                    {user.address.city}, {user.address.zipcode}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Coordinates
                  </label>
                  <p className="text-foreground text-sm font-mono">
                    {user.address.geo.lat}, {user.address.geo.lng}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>Company</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Company Name
                  </label>
                  <p className="text-foreground font-medium">
                    {user.company.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Catch Phrase
                  </label>
                  <p className="text-foreground italic">
                    {user.company.catchPhrase}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Business
                  </label>
                  <p className="text-foreground">{user.company.bs}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
