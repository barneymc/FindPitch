//
//  TestPlug.h
//  FindPitch
//
//  Created by Joe Bloggs on 15/08/2010.
//  Copyright 2010 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "PhoneGapCommand.h"


@interface TestPlug : PhoneGapCommand {
}
-(void)addThemUp:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;  

-(void)openMapLocation:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;  

-(void)openVC2:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;  


@end
