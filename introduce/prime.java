package introduce;

import java.util.Scanner;

class prime {
    boolean isPrime(long number) {
        if (number < 2) {
            return false;
        }
        for (int i = 2; i <= Math.sqrt(number); i++) {
            if (number % i == 0) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        long number = input.nextLong();
        prime obj = new prime();
        boolean result = obj.isPrime(number);
        if (result) {
            System.out.println("True");
        }
        else {
            System.out.println("False");
        }

        input.close();
    }
}