import { Welcome, loader } from '~/welcome/welcome'

export { loader }

export function meta() {
  return [
    { title: 'Dashboard - Vigie' },
    { name: 'description', content: 'Dashboard overview of your application' },
  ]
}

export default function Home() {
  return <Welcome />
}
