//
//  TestPlug.m
//  FindPitch
//
//  Created by Joe Bloggs on 15/08/2010.
//  Copyright 2010 __MyCompanyName__. All rights reserved.
//

#import "TestPlug.h"
#import "VC2.h"


@implementation TestPlug

- (void)addThemUp:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options  
{  
	NSUInteger argc = [arguments count];  
	int total = 0;  
	for(int n = 0; n < argc; n++)  
	{  
		total += [[ arguments objectAtIndex:n] intValue];  
	}  
	NSString* retStr = [ NSString stringWithFormat:@"alert(\"%d\");",total];  
	[ webView stringByEvaluatingJavaScriptFromString:retStr ];  
}  


//Add this Plug-in method so we can open the map from a JavaScript function 
-(void)openMapLocation:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
	
	
}

//This self code only works for a UIViewController....so cant be called here
//Need to add this method to the MainWindow thats created when PhoneGap starts up....
-(void)openVC2:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
	
	VC2 *view2=[[VC2 alloc] initWithNibName:@"VC2" bundle:nil];
	view2.modalTransitionStyle=UIModalTransitionStyleFlipHorizontal;
	//[self presentModalViewController:view2 animated:YES];
	[self presentModalViewController:view2 ];
}

@end
