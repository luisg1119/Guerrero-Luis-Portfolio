// Author:Luis Guerrero

package model;

import static org.junit.Assert.*;

import org.junit.Test;

public class JUnitTest {

	@Test 
	public void test() {
		KeywordCollection collection = new KeywordCollection();

		//add simple
		assertTrue(collection.addKeyword("a"));
		collection.addKeyword("b");
		assertEquals(2, collection.size());
		
		//Check if adds the same
		assertFalse(collection.addKeyword("a"));
		//Re-check size to make sure it did not add
		assertEquals(2, collection.size());
		
		//Add Max
		for(int i =0; i<62;i++){
			collection.addKeyword(""+i);
		}
		assertEquals(64, collection.size()); 	//total in hashmap
		
		//System.out.println(collection.listKnownKeywords());
		//System.out.println(collection.size());
		System.out.println("You Passed the \"Add\" Tests!");
	}
	
	@Test (expected = TooManyKeywordsException.class)
	//Test Exception when adding over 64
	public void test1() {
		KeywordCollection collection = new KeywordCollection();

		for(int i=0; i<64;i++){
			collection.addKeyword(""+i);
		}		
		//System.out.println(collection.size());
		
		assertEquals(64, collection.size());
		
		System.out.println("You Passed the \"Add Exception\" Tests!");
		
		//This test will fail while exception is thrown
		assertNull(collection.addKeyword("EXCEPTION")); 
	}
	
	@Test
	//Test Clear Method with isEmpty method
	public void Test2() {
		KeywordCollection collection = new KeywordCollection();

		assertTrue(collection.isEmpty());
		for(int i=0; i<64;i++){
			collection.addKeyword(""+i);
		}	
		assertEquals(64, collection.size());
		collection.clearKeywords(); 
		assertEquals(64, collection.knownSize());
		assertEquals(0, collection.size());
		assertTrue(collection.isEmpty());
		
		System.out.println("You Passed the \"Clearing Keywords and isEmpty\" Tests!");
	}
		
	@Test
	// Tests listKnownKeywords to see if something does or does not exist
	public void Test3() {
		KeywordCollection collection = new KeywordCollection();
		KeywordCollection collection2 = new KeywordCollection();

		collection.addKeyword("a");
		collection.addKeyword("b");
		
		assertEquals(true, collection.listKnownKeywords().contains("a"));
		assertEquals(false, collection.listKnownKeywords().contains("c"));
		assertEquals(2, collection.listKnownKeywords().size());
		//System.out.println(collection.listKnownKeywords());
		
		//Check globally how many instances there exists in hashmap
		collection2.addKeyword("c");
		collection2.addKeyword("d");
		assertEquals(4, collection.listKnownKeywords().size());
		//System.out.println(collection.listKnownKeywords());
		
		System.out.println("You Passed the \"List Known Keywords and list\" tests!");
	}
	
	@Test
	//removing from the keyword List
	public void Test4() {
		KeywordCollection collection = new KeywordCollection();
		KeywordCollection collection2 = new KeywordCollection();

		collection.addKeyword("a");
		collection.addKeyword("b");
		collection.addKeyword("c");
		collection.addKeyword("d");
		collection2.addKeyword("e");
		
		assertEquals(4, collection.listKeywords().size());
		assertTrue(collection.removeKeyword("d"));
		assertEquals(3, collection.listKeywords().size());
		assertTrue(collection2.removeKeyword("e"));
		assertFalse(collection2.removeKeyword("f"));
		
		assertEquals(5, collection2.listKnownKeywords().size());
		assertEquals(3, collection.size());  
		
		System.out.println("You Passed the \"Remove Keyword \" Tests");
	}
	
	@Test  (expected = TooManyKeywordsException.class)
	//Tests the correlation method
	public void Test5() {
		KeywordCollection collection = new KeywordCollection();
		KeywordCollection collection2 = new KeywordCollection();
		
		for(int i=0;i<10; i++){
			collection.addKeyword(""+i);
		}
		for(int i=0;i<10; i++){
			collection2.addKeyword(""+i);
			}
		
		assertEquals(10,collection.listKeywords().size());
		assertEquals(10,collection2.listKeywords().size());
		assertFalse(collection2.addKeyword("1"));
		assertEquals(1.0,1.0,collection.correlation(collection2));
		
		for(int i=10;i<20; i++){
			collection.addKeyword(""+i);
		}
		for(int i=10;i<13; i++){
			collection2.addKeyword(""+i);
			}
		assertEquals(.78,.78787878,collection.correlation(collection2));
		
		for(int i=20;i<63; i++){
			collection.addKeyword(""+i);
		}
		assertEquals(.29,.29545454,collection.correlation(collection2));
		
		collection.addKeyword("A");
		collection2.addKeyword("A");
		assertEquals(.29,.30434782608695654,collection.correlation(collection2));
		
		
		//System.out.println(collection.correlation(collection2));
		
		System.out.println("You Passed the \"Correlation \" Tests");
		
		assertFalse(collection2.addKeyword("B"));  //should get error for this
	}
}
