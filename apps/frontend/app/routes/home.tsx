import { Welcome } from '~/welcome/welcome'

export function meta() {
  return [
    { title: 'Home - Vigie' },
    { name: 'description', content: 'Welcome to Vigie application' },
  ]
}

export default function Home() {
  return <Welcome />
}
