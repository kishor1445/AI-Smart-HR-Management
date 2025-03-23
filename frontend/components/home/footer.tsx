import Link from "next/link"
import { Users } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Integrations", "Roadmap", "Changelog"]
    },
    {
      title: "Resources",
      links: ["Blog", "Documentation", "Help Center", "Community", "Webinars"]
    },
    {
      title: "Company",
      links: ["About", "Careers", "Contact", "Privacy Policy", "Terms of Service"]
    }
  ]
  
  const socialLinks = ["Twitter", "LinkedIn", "Facebook", "GitHub"]

  return (
    <footer className="border-t py-12 md:py-16 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="size-9 rounded-xl bg-violet-600 flex items-center justify-center">
                <Users className="size-4 text-white" />
              </div>
              <span className="bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">HRFlow</span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Modern HR management software for growing teams. Simplify your HR operations and focus on what matters most—your people.
            </p>
          </div>
          
          {footerLinks.map((section, i) => (
            <div key={i}>
              <h3 className="mb-4 text-sm font-medium">{section.title}</h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link 
                      href="#" 
                      className="text-sm text-muted-foreground hover:text-violet-600 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t pt-8">
          <p className="text-sm text-muted-foreground">
            © {currentYear} HRFlow. All rights reserved.
          </p>
          <div className="flex gap-6">
            {socialLinks.map((social, i) => (
              <Link 
                key={i} 
                href="#" 
                className="text-sm text-muted-foreground hover:text-violet-600 transition-colors"
              >
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
