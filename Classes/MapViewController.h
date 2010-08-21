//
//  MapView.h
//  FindPitch
//
//  Created by Joe Bloggs on 16/08/2010.
//  Copyright 2010 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <MapKit/MapKit.h>

@interface AddressAnnotation : NSObject<MKAnnotation> {
	CLLocationCoordinate2D coordinate;
	NSString* title;
	NSString* subtitle;
}

@property (nonatomic) CLLocationCoordinate2D coordinate;
@property (retain) NSString* title;
@property (retain) NSString* subtitle;



@end

@interface MapViewController : UIViewController<MKMapViewDelegate> {
	IBOutlet UITextField *addressField;
	IBOutlet UIButton *goButton;
	IBOutlet MKMapView *mapView;
	
	AddressAnnotation *addAnnotation;
	
	NSString* Town;
	NSString* TownSubtitle;
	CLLocationCoordinate2D mycoordinate;
	
}

@property (retain) NSString* Town;
@property (retain) NSString* TownSubtitle;
@property (nonatomic) CLLocationCoordinate2D mycoordinate;

-(IBAction) showAddress;
-(IBAction) showVC2;
-(IBAction) goBack;
-(IBAction) showCurrentLocation;

-(CLLocationCoordinate2D) addressLocation;
-(void) showArgsAddress;

@end

