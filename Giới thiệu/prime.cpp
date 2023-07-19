// Thuật toán tối ưu nhất
#include <iostream>
#include <cmath>

using namespace std;

bool prime(long long int number) {
  if(number < 2) return false;
  for(int i = 2; i <= sqrt(number); i++){
    if(number % i == 0) return false;
  }
  return true;
}

int main(){
  long long int number;
  cin >> number;
  if(prime(number)) {
    cout << "True";
  }
  else {
    cout << "False";
  }
  return 0;
}