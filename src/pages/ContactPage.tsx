import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Message sent! We will contact you soon.');
    setForm({ name: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="bg-primary py-10">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">Contact Us</h1>
            <p className="mt-2 text-primary-foreground/60">Get in touch with Kings Sellers</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Form */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="font-display text-xl font-semibold mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    maxLength={100}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</label>
                  <Input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+255 7XX XXX XXX"
                    maxLength={20}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Message</label>
                  <Textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help?"
                    rows={4}
                    maxLength={1000}
                    className="mt-1"
                  />
                </div>
                <Button variant="gold" size="lg" className="w-full" type="submit">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div className="bg-card rounded-xl p-6 shadow-card space-y-5">
                <h2 className="font-display text-xl font-semibold">Our Details</h2>
                {[
                  { icon: Phone, label: '+255 700 000 000' },
                  { icon: Mail, label: 'info@kingssellers.co.tz' },
                  { icon: MapPin, label: 'Dar es Salaam, Tanzania' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-gold/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <span className="text-sm text-card-foreground">{label}</span>
                  </div>
                ))}
              </div>

              <div className="bg-card rounded-xl p-6 shadow-card">
                <h2 className="font-display text-xl font-semibold mb-3">Quick Contact</h2>
                <p className="text-sm text-muted-foreground mb-4">Reach us instantly via WhatsApp</p>
                <Button variant="gold" size="lg" className="w-full" asChild>
                  <a href="https://wa.me/255700000000" target="_blank" rel="noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
