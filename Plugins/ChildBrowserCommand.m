//

// 
//
//  Created by Jesse MacFadyen on 10-05-29.
//  Copyright 2010 Nitobi. All rights reserved.
//

#import "ChildBrowserCommand.h"
#import "ChildBrowserViewController.h"
#import "PhoneGapViewController.h"
#import "MapViewController.h"


@implementation ChildBrowserCommand

- (void) showWebPage:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options // args: url
{	
	ChildBrowserViewController* childBrowser = [ [ ChildBrowserViewController alloc ] initWithScale:FALSE ];
	
/* // TODO: Work in progress
	NSString* strOrientations = [ options objectForKey:@"supportedOrientations"];
	NSArray* supportedOrientations = [strOrientations componentsSeparatedByString:@","];
*/
	PhoneGapViewController* cont = (PhoneGapViewController*)[ super appViewController ];
	//childBrowser.supportedOrientations = cont.supportedOrientations;
	[ cont presentModalViewController:childBrowser animated:YES ];
	
	NSString *url = (NSString*) [arguments objectAtIndex:0];

	[childBrowser loadURL:url  ];
	[childBrowser release];
}

- (void) showMap:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
{
	
	MapViewController *view2=[[MapViewController alloc] initWithNibName:@"MapView" bundle:nil];
	view2.modalTransitionStyle=UIModalTransitionStyleFlipHorizontal;
	
	CLLocationCoordinate2D location2D;
	//float *latx=(float*)[arguments objectAtIndex:0];
	//float *laty=(float*)[arguments objectAtIndex:0];
	
	//location.latitude = 53.2793;
	//location.longitude = -9.0618;
	location2D.latitude = [[arguments objectAtIndex:1] doubleValue];
	location2D.longitude = [[arguments objectAtIndex:2] doubleValue];
	
	//location.latitude = latx;
	//location.longitude =laty;
		
	//Access the public property on the View
	
	view2.mycoordinate=location2D;
	
	//view2.Town = @"Limerick";
	view2.Town=(NSString*) [arguments objectAtIndex:3];
	view2.TownSubtitle=(NSString*) [arguments objectAtIndex:4];
	
	PhoneGapViewController* cont = (PhoneGapViewController*)[ super appViewController ];
	//childBrowser.supportedOrientations = cont.supportedOrientations;
	[ cont presentModalViewController:view2 animated:YES ];
	
	NSString *url = (NSString*) [arguments objectAtIndex:0];
	
	//[childBrowser loadURL:url  ];
	[view2 release];
	
	
	
}

@end
