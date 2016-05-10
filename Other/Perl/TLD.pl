# Owner:Luis Guerrero
#
# Date:05/09/16
#
# Description: The following creates a .txt file full of random Top 
# Level Domain's (TLD). To Change the output of these files please 
# change lines 17 - 21. Once the file has been created the file is 
# read from where the file is being ran and sorts the output. Finally,
# a new output file is created with the sorted list. 


use strict;
use warnings;
use List::Util qw/shuffle/;

#Main - controller
my $unSortedFile = "TLDUnsorted.txt";
my $sortedFile = "TLDSorted.txt";
my $minWord = 3;
my $maxWord = 11;
my $totalWords = 50; #Reasonable numbers - No Extensive Error Handling

#Create TLD Array
my @array = createTLD($minWord, $maxWord);

#Put word array in a .txt document
exportToText($totalWords, $unSortedFile, @array);

#Read in File and Sort
my @sortedArray = sortFile($unSortedFile);

#Put sorted array in its own .txt document
exportToText($totalWords, $sortedFile, @sortedArray);


#create random TLD's 
sub createTLD{
	#Get Params that specify min and max word limit
	#and number of words to create
	my ($minimum, $maximum, $numwords) = (@_);
	#Load location of dectionary(Unix local path)
	my $dictionary = '/usr/share/dict/words';
	#Array Variable
	my @words;

	#Open dictionary Library in Perl and add a reference to the variable WORDS 
	open (my $dict, '<', $dictionary) 
		or die "Cannot open $dictionary:$!";

	#Iterate through the whole dictionary to get words from A-Z
	while (my $word = <$dict>) {
	    #Remove all special character escapes (i.e. \n)
	    chomp($word);
	    
	    #Specify the length of the word (random Length between params)
	    my $length = $minimum + int(rand($maximum - $minimum));

	    #Add to the array of words if the word meets criteria;
	    if (length($word) == $length){
	    	my $ext = getExtention();
	    	$word = lc($word) . $ext . "\n";
	    	push (@words, $word) ;
	    }
	}
	#Close opened dictionary resource
	close $dict;

	#Unsort words to get random words instead 
	my @shuffled_words = shuffle(@words);

	return @shuffled_words;
	#print for @shuffled_words[0 .. $numwords -1 ];
}

sub getExtention{
	#Create a random number from 0-6
	my $var = int(rand(6));

	#return correct extention
	if($var == 0){
		return ".biz" 
	}
	elsif($var == 1){
		return ".co.uk" 
	}
	elsif($var == 2){  
		return ".cc" 
	}
	elsif($var == 3){
		return ".org" 
	}
	elsif($var == 4){
		return ".net" 
	}
	else{	
		return ".com" 
	}
}

sub exportToText{
	#params
	my ($num, $fileName, @array) = (@_);
	#Desired filename
	#File to write open/create
	open(my $file, '>', $fileName) 
		or die "Could not open file '$fileName' $!";
	#File Contents	
	print $file @array[0 .. $num - 1];
	#Close file writing
	close $file;
}

sub sortFile{
	my ($fileName) = (@_);
	my @wordArray;
	my %hash;

	open(my $file, '<', $fileName) 
		or die "Could not open file '$fileName' $!";

	while (my $word = <$file>) {
		push(@wordArray, $word);
	}


  	# print "Result: $result\n";
	foreach my $x (@wordArray){
		chomp($x);

	  	my $char = '.';
	  	my $length = length($x);
 		my $index = rindex($x, $char);
 		my $substring = 0;
 		my $occurance = () = $x =~ /\./gi;

 		#check how many '.' there are and handle 
 		if($occurance > 1){
 			# print $index;
 			$substring = substr($x,0,$index);
 			#find the 2nd to last '.'
 			$index = rindex($substring, $char);
 			#the new substring key is:
 			$substring = substr($substring,$index+1,length($substring));
 			#Err Handling if anything that is not an extention do this
 			if(length($substring) > 3){
 				$index = rindex($x, $char);
 				$substring = substr($x,$index+1,$length);
 			}
 		}
 		else{
 			$substring = substr($x,$index+1,$length);
 		}

 		#if the hash mapping does not exist create new hash
	    if(!exists $hash{$substring}){
	  		$hash{$substring} = [];
	  		push(@{$hash{$substring}}, $x);
	  	}
	  	else{
	  		push(@{$hash{$substring}}, $x);
	  	}
	}

	my @sortedArray; 				#Declare a array for final output
	my @keys; 						#Declare array for hash keys

	#Loop to iterate through hash
	foreach my $key (keys %hash){
		#save each key that is available
		push(@keys, $key);
		#sort each hash set
		@{$hash{$key}} = sort(@{$hash{$key}});
	}

	#sort keys array 
	@keys = sort(@keys);

	my $count = 0; 					#counter for keys increment
	my $keyCount = scalar(@keys); 	#total length from keys array
	while ($count < $keyCount){
		my $temp = $keys[$count];
		foreach my $newWord (@{$hash{$temp}}){
			push(@sortedArray, ($newWord . "\n"));
		}
		$count = $count + 1;
	} 
	
	return @sortedArray;
}


