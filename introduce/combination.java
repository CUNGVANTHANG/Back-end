package introduce;

import java.util.Scanner;

class combination {
    long gcd(long a, long b) {
        if (a == 0)
            return b;

        while (b != a) {
            if (a > b)
                a = a - b;
            else
                b = b - a;
        }

        return a;
    }

    long nCk(int n, int k) {
        long nFactorial = 1;
        long kFactorial = 1;

        // Because: C(n, k) = C(n, n - k)
        if (n - k < k) {
            k = n - k;
        }
        if (k != 0) {
            while (k != 0) {
                nFactorial *= n;
                kFactorial *= k;

                long gcd = gcd(nFactorial, kFactorial);

                nFactorial /= gcd;
                kFactorial /= gcd;

                n--;
                k--;
            }
        }
        else {
            nFactorial = 1;
        }

        return nFactorial;
    }

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int n = input.nextInt();
        int k = input.nextInt();
        combination obj = new combination();
        long result = obj.nCk(n, k);
        System.out.println(result);
        input.close();
    }
}
