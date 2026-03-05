import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Car } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({ title: 'Kosa', description: 'Nenosiri hazifanani', variant: 'destructive' });
      return;
    }

    if (password.length < 6) {
      toast({ title: 'Kosa', description: 'Nenosiri lazima iwe na herufi 6 au zaidi', variant: 'destructive' });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });

      if (error) throw error;

      toast({ title: 'Umefanikiwa', description: 'Akaunti imeundwa! Tafadhali angalia barua pepe yako kuthibitisha akaunti yako.' });
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      toast({ title: 'Kosa', description: error instanceof Error ? error.message : 'Imeshindikana kuunda akaunti', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-muted/30 p-4 py-8 md:py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Fungua Akaunti</CardTitle>
            <CardDescription>Jisajili ili uhifadhi magari unayopenda na upate taarifa mpya</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Jina Kamili</Label>
                <Input id="fullName" type="text" placeholder="Jina lako" value={fullName} onChange={(e) => setFullName(e.target.value)} required disabled={loading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Barua Pepe</Label>
                <Input id="email" type="email" placeholder="wewe@mfano.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Nenosiri</Label>
                <Input id="password" type="password" placeholder="Angalau herufi 6" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} minLength={6} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Thibitisha Nenosiri</Label>
                <Input id="confirmPassword" type="password" placeholder="Rudia nenosiri lako" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required disabled={loading} minLength={6} />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Inaunda akaunti...</>) : 'Jisajili'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              Tayari una akaunti?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">Ingia</Link>
            </div>
            <div className="text-xs text-center text-muted-foreground">
              Kwa kujisajili, unakubali Masharti ya Huduma na Sera ya Faragha
            </div>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
