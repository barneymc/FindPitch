//MapBiew Controller

#import "MapViewController.h"
#import "VC2.h"

@implementation AddressAnnotation

@synthesize coordinate;
@synthesize subtitle;
@synthesize title;

//- (NSString *)subtitle{
//	return @"Sub Title";
//}

//- (NSString *)title{
//	return @"TitleStuff";
//}

-(id)initWithCoordinate:(CLLocationCoordinate2D) c{
	coordinate=c;
	title=@"StartTitle";
	subtitle=@"Subtitle";
	
	//subTitle=subtitleP;
	//[Title retain];
	
	
	NSLog(@"%f,%f",c.latitude,c.longitude);
	return self;
}

@end


@implementation MapViewController


@synthesize Town;
@synthesize TownSubtitle;

//@synthesize latitudex;
//@synthesize longitudey;
@synthesize mycoordinate;

//-(CLLocationCoordinate2D) coordinate
//{
//	CLLocationCoordinate2D coord={self.latitudex,self.longitudey};
//	return coord;
//}

//-(void) setcoordinate:(

/*
 // The designated initializer.  Override if you create the controller programmatically and want to perform customization that is not appropriate for viewDidLoad.
 - (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
 if (self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil]) {
 // Custom initialization
 }
 return self;
 }
 */

/*
 // Implement loadView to create a view hierarchy programmatically, without using a nib.
 - (void)loadView {
 }
 */

-(IBAction) showVC2{
	VC2 *view2=[[VC2 alloc] initWithNibName:@"VC2" bundle:nil];
	view2.modalTransitionStyle=UIModalTransitionStyleFlipHorizontal;
	[self presentModalViewController:view2 animated:YES];
	

}

-(IBAction)goBack
{
	[self dismissModalViewControllerAnimated:YES];	
	
}

//Called by clicking on the SHOW button
//Fetches the location coordinates from Google by calling addressLocation
//before showing them on map
- (IBAction) showAddress {
	//Hide the keypad
	[addressField resignFirstResponder];
	MKCoordinateRegion region;
	MKCoordinateSpan span;
	span.latitudeDelta=0.2;
	span.longitudeDelta=0.2;
	
	//BMCA - rather than passing in the address and getting Google's LatLng
	//just set my own here.....
	//These LatLngs could be pass in via args from JavaScript...
	
	//addressLocation function is called - gets the co-ords from Google - and uses the coords here
	CLLocationCoordinate2D location = [self addressLocation];
	//CLLocationCoordinate2D location2D;  //this is the ViewControllers.mycoordinate Public property
	//location.latitude = mycoordinate.latitude;
	//location.longitude= mycoordinate.longitude;
	
	//location.longitude = -9.0618;
	region.span=span;
	region.center=location;
	
	
	//This removes any? existing annotations
	//So you can keep adding Annotations
	//if(addAnnotation != nil) {
	//	[mapView removeAnnotation:addAnnotation];
	//	[addAnnotation release];
	//	addAnnotation = nil;
	//}
	
	addAnnotation = [[AddressAnnotation alloc] initWithCoordinate:location];
	[mapView addAnnotation:addAnnotation];
	[mapView setRegion:region animated:TRUE];
	[mapView regionThatFits:region];
	//[mapView selectAnnotation:mLodgeAnnotation animated:YES];
}



-(CLLocationCoordinate2D) addressLocation {
	NSString *urlString = [NSString stringWithFormat:@"http://maps.google.com/maps/geo?q=%@&output=csv", 
						   [addressField.text stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
	NSString *locationString = [NSString stringWithContentsOfURL:[NSURL URLWithString:urlString]];
	NSArray *listItems = [locationString componentsSeparatedByString:@","];
	
	double latitude = 0.0;
	double longitude = 0.0;
	
	if([listItems count] >= 4 && [[listItems objectAtIndex:0] isEqualToString:@"200"]) {
		latitude = [[listItems objectAtIndex:2] doubleValue];
		longitude = [[listItems objectAtIndex:3] doubleValue];
	}
	else {
		//Show error
	}
	CLLocationCoordinate2D location;
	location.latitude = latitude;
	location.longitude = longitude;
	
	return location;
}

- (MKAnnotationView *) mapView:(MKMapView *)mapView viewForAnnotation:(id <MKAnnotation>) annotation{
	MKPinAnnotationView *annView=[[MKPinAnnotationView alloc] initWithAnnotation:annotation reuseIdentifier:@"currentloc"];
	annView.pinColor = MKPinAnnotationColorGreen;
	annView.animatesDrop=TRUE;
	annView.canShowCallout = YES;
	annView.calloutOffset = CGPointMake(-5, 5);
	return annView;
}

- (IBAction)showCurrentLocation
{
	
	CLLocationCoordinate2D userLoc;
	userLoc.latitude = mapView.userLocation.location.coordinate.latitude;
	userLoc.longitude = mapView.userLocation.location.coordinate.longitude;
	mapView.region = MKCoordinateRegionMakeWithDistance(userLoc, 50000, 50000);
	
}


 // Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad {
	 [super viewDidLoad];
	 [self showArgsAddress];
 }


//This method gets called by viewDidLoad and sets the initial coordinates
//Uses the Public ViewController.mycoordinate property which is set by the calling function
//all the way back in the Javascript call
- (void) showArgsAddress{
	[addressField resignFirstResponder];
	MKCoordinateRegion region;
	MKCoordinateSpan span;
	span.latitudeDelta=0.2;
	span.longitudeDelta=0.2;
	
	
	//These LatLngs could be pass in via args from JavaScript...
	
	
	//CLLocationCoordinate2D location = [self addressLocation];
	CLLocationCoordinate2D location3D;
	location3D.latitude = mycoordinate.latitude;
	location3D.longitude = mycoordinate.longitude;
	region.span=span;
	region.center=location3D;
	
	if(addAnnotation != nil) {
		[mapView removeAnnotation:addAnnotation];
		[addAnnotation release];
		addAnnotation = nil;
	}
	
	addAnnotation = [[AddressAnnotation alloc] initWithCoordinate:location3D];
	addAnnotation.title=self.Town;
	addAnnotation.subtitle=self.TownSubtitle;
	
	[mapView addAnnotation:addAnnotation];
	
	[mapView setRegion:region animated:TRUE];
	[mapView regionThatFits:region];
	mapView.showsUserLocation=YES;
	
	//[mapView selectAnnotation:mLodgeAnnotation animated:YES];
	
}

/*
 // Override to allow orientations other than the default portrait orientation.
 - (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
 // Return YES for supported orientations
 return (interfaceOrientation == UIInterfaceOrientationPortrait);
 }
 */

- (void)didReceiveMemoryWarning {
	// Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
	
	// Release any cached data, images, etc that aren't in use.
}

- (void)viewDidUnload {
	// Release any retained subviews of the main view.
	// e.g. self.myOutlet = nil;
}


- (void)dealloc {
	//self.latitude=nil;
	//[self.longitude=nil];
	[Town release];
    [super dealloc];
}

@end
