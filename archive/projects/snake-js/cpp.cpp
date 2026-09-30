#include <iostream>
#include <conio.h>
namespace std::cout;
namespace std::cin;
namespace std::endl;

void greet(char* name){

	cout << "hello "<< name << endl;
}

int main(){


	greet("john");


	return 0;
}